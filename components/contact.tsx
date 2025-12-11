import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppConsultation } from "@/components/whatsapp-consultation"

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-stone-900 mb-8">CONTACT</h2>
            <div className="w-16 h-px bg-stone-900 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-light tracking-wide text-stone-900 mb-6">GET IN TOUCH</h3>
              <div className="space-y-4 text-stone-600 font-light">
                <p>
                  ENOU/HR Architecture Studio
                  <br />
                  Premium Design Services
                  <br />
                  Mauritius
                </p>
                <p>+230 58110646</p>
                <p>Enou.mu@outlook.com</p>
              </div>
            </div>

            <form className="space-y-6">
              <Input placeholder="Name" className="border-stone-300 bg-white font-light" />
              <Input placeholder="Email" type="email" className="border-stone-300 bg-white font-light" />
              <Textarea placeholder="Message" rows={5} className="border-stone-300 bg-white font-light resize-none" />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-light tracking-wide"
                >
                  SEND MESSAGE
                </Button>
                <WhatsAppConsultation 
                  triggerText="WhatsApp Consultation"
                  triggerClassName="flex-1 bg-green-600 hover:bg-green-700 text-white font-light tracking-wide px-6 py-2 rounded-md transition-colors duration-200"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
