#!/bin/sh

#run: choose_profile.sh % TemcE2E mu 01 sqs_to_workload_versions "" >/dev/null

# sqs_to_workload_versions.sh
# - filters out affiliate id "0"
# - only includes mapped affiliate ids (others ignored)
# - ensures all version "slots" seen across inputs are present for each workload (empty array if none)
# - prints only JSON on stdout
set -eu

# Printing 'a' at the end prevents `$( )` from trimming whitespace
wd="$( dirname "${0}"; printf a )"; wd="${wd%?a}"
cd "${wd}" || exit "$?"
repo_root_dir="$( git rev-parse --show-toplevel )"

if [ $# -lt 1 ]; then
  printf 'Usage: %s <sqs-queue-arn-or-name> [<...>]\n' "$0" >&2
  exit 1
fi

command -v aws >/dev/null 2>&1 || { printf 'Error: aws CLI not found\n' >&2; exit 1; }
command -v jq >/dev/null 2>&1 || { printf 'Error: jq not found\n' >&2; exit 1; }
command -v nickel >/dev/null 2>&1 || { printf 'Error: nickel not found\n' >&2; exit 1; }

# Get workload data from config-tool
WORKLOAD_DATA="$( nickel export "${repo_root_dir}/meta/workloads.ncl" \
  --field "repos.by_id" \
)" || exit "$?"

# affiliate_id -> country mapping
mapping_json='{
  "9001":"ph","9002":"jo","9003":"mu","9004":"mg","9005":"ao","9006":"px","9007":"aa","9008":"wk","9009":"vh",
  "9012":"za","9013":"mq","9014":"bf","9015":"kh","9016":"cm","9017":"cg","9018":"ci","9019":"eg","9020":"et",
  "9021":"fj","9022":"ga","9023":"gh","9024":"gn","9025":"gq","9026":"jm","9027":"ke","9028":"re","9029":"ly",
  "9030":"lr","9031":"mw","9032":"ml","9033":"ma","9034":"mr","9035":"yt","9036":"mz","9037":"ne","9038":"ng",
  "9039":"nc","9040":"ug","9041":"pk","9042":"pf","9043":"cf","9044":"cd","9045":"do","9046":"sn","9047":"sl",
  "9048":"tz","9049":"td","9050":"tg","9051":"tn","9052":"zm","9053":"zw","9054":"pr","9055":"pg","9056":"rw",
  "9057":"to"
}'

pad2(){ printf "%02d" "$1"; }

# recursive jq expression to extract affiliate-like keys (case-insensitive), emit values as strings
jq_aff_extract='
  (.Attributes.FilterPolicy // "") |
  (fromjson? // {}) |
  .. | objects |
  to_entries[]? |
  select(.key | test("affiliate"; "i")) |
   .value |
  if type=="array" then .[] else . end |
  tostring
'

# Collect entries as JSON array of {workload, version, region}
entries='[]'
all_versions_tmp=$(mktemp)
cleanup() {
  rm -f "$all_versions_tmp"
}
trap cleanup EXIT

for input in "$@"; do
  queue_arn="$input"
  queue_name=""
  if printf '%s' "$input" | grep -q '^arn:aws:sqs:'; then
    queue_name="${input##*:}"
  else
    qurl=$(aws sqs get-queue-url --queue-name "$input" --output text 2>/dev/null || true)
    if [ -z "$qurl" ]; then
      printf 'Warning: could not resolve SQS queue name "%s" - skipping\n' "$input" >&2
      continue
    fi
    queue_arn=$(aws sqs get-queue-attributes --queue-url "$qurl" --attribute-names QueueArn --output json 2>/dev/null \
      | jq -r '.Attributes.QueueArn // empty')
    if [ -z "$queue_arn" ]; then
      printf 'Warning: could not obtain ARN for queue "%s" - skipping\n' "$input" >&2
      continue
    fi
    queue_name="$input"
  fi

  # derive workload/version from queue_name - validate against config-tool data
  qn="$queue_name"
  version="00"
  workload="unknown"

  # Extract version from queue name
  if printf '%s' "$qn" | grep -Eq -- '-[0-9]{1,2}$'; then
    version_raw=$(printf '%s' "$qn" | sed -E 's/.*-([0-9]{1,2})$/\1/')
    version=$(pad2 "$version_raw")
    family_base=$(printf '%s' "$qn" | sed -E 's/-[0-9]+$//')
  else
    if printf '%s' "$qn" | grep -q '[0-9]'; then
      version_raw=$(printf '%s' "$qn" | sed -E 's/.*([0-9]{1,2}).*/\1/')
      version=$(pad2 "$version_raw")
      family_base=$(printf '%s' "$qn" | sed -E 's/-[0-9]+$//')
    else
      family_base="$qn"
          fi
  fi

  # Extract workload name
  if printf '%s' "$family_base" | grep -q -- '-'; then
    workload="${family_base##*-}"
  else
    workload="$family_base"
  fi
  workload=$(printf '%s' "$workload" | sed 's/[^A-Za-z0-9_-]//g' | tr '[:upper:]' '[:lower:]')

  # Validate workload exists in config-tool data
  workload_exists=$(printf '%s' "$WORKLOAD_DATA" | jq -r --arg wl "$workload" 'has($wl)')
  if [ "$workload_exists" != "true" ]; then
    printf 'Warning: workload "%s" not found in config-tool data - skipping queue "%s"\n' "$workload" "$queue_name" >&2
    continue
  fi

  # record version globally
  printf '%s\n' "$version" >> "$all_versions_tmp"

  # find SNS subscriptions targeting this SQS
  subs_json=$(aws sns list-subscriptions --output json 2>/dev/null || echo '{"Subscriptions":[]}')
  sub_arns=$(printf '%s\n' "$subs_json" | jq -r --arg endpoint "$queue_arn" '.Subscriptions[] | select(.Protocol=="sqs" and .Endpoint == $endpoint) | .SubscriptionArn')

  # collect affiliate ids for this queue (union) in a temporary file
  tmpfile=$(mktemp)
  cleanup_tmp() {
    rm -f "$tmpfile"
  }
  trap 'cleanup_tmp; cleanup' EXIT

  if [ -n "$sub_arns" ]; then
    printf '%s\n' "$sub_arns" | while IFS= read -r sub; do
      [ -z "$sub" ] && continue
      attrs=$(aws sns get-subscription-attributes --subscription-arn "$sub" --output json 2>/dev/null || echo '{}')
      printf '%s\n' "$attrs" | jq -r "$jq_aff_extract" 2>/dev/null | sed '/^$/d' >> "$tmpfile" || true
    done
  fi

  if [ ! -s "$tmpfile" ]; then
    rm -f "$tmpfile"
    continue
  fi

  # unique affiliate ids
  affiliates_sorted=$(sort -u "$tmpfile")
  rm -f "$tmpfile"
   # for each affiliate id: skip '0', map id->country via mapping_json; if mapping missing skip
  while IFS= read -r aff; do
    [ -z "$aff" ] && continue
    # skip zero
    if [ "$aff" = "0" ]; then
      continue
    fi
    # look up mapping
    country=$(jq -r --arg id "$aff" --argjson map "$mapping_json" '$map[$id] // empty' <<< "$mapping_json" 2>/dev/null || true)
    if [ -z "$country" ]; then
      # ignore unmapped ids per your request
      continue
    fi
    # append entry {workload, version, region(country)} to entries
    entries=$(jq -n --argjson arr "$entries" --arg w "$workload" --arg v "$version" --arg r "$country" '$arr + [{workload:$w,version:$v,region:$r}]')
  done <<< "$affiliates_sorted"
done

# If no entries, print empty JSON and exit
if [ "$entries" = '[]' ]; then
  printf '{}\n'
  exit 0
fi

# compute sorted unique versions (global)
versions_sorted=$(sort -u "$all_versions_tmp" | sort -n | tr '\n' ' ' | sed 's/ $//')
if [ -z "$versions_sorted" ]; then
  versions_json='[]'
else
  versions_json=$(printf '%s' "$versions_sorted" | tr ' ' '\n' | jq -R -s 'split("\n")[:-1]')
fi

# aggregate into workload->{version:[regions]} (unique & sorted per version)
final=$(jq -n --argjson arr "$entries" '
  reduce $arr[] as $it ({};
    .[$it.workload] |= (. // {}) |
    .[$it.workload][$it.version] |= ((. // []) + [$it.region])
  )
  | to_entries
  | map({ key:.key, value:(.value | to_entries | map({ key:.key, value:(.value | unique | sort) }) | from_entries) })
  | from_entries
')

# ensure every workload has all versions present (fill missing with empty array)
result=$(jq -n --argjson obj "$final" --argjson versions "$versions_json" '
  ($obj // {}) as $o |
  $o
  | to_entries
  | map({
   key: .key,
      value: (
        .value as $v |
        ($versions) as $vs |
        reduce $vs[] as $ver ( $v; .[$ver] = (.[$ver] // []) )
      )
    })
  | from_entries
')

# print only JSON on stdout
printf '%s\n' "$result"
exit 0
