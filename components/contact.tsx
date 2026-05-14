import { Github, Linkedin, Mail, Phone } from "lucide-react"
import Link from "next/link"

const contacts = [
  {
    label: "Email",
    value: "tkustanayev@kbtu.kz",
    href: "mailto:tkustanayev@kbtu.kz",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/wakeupkstnv",
    href: "https://linkedin.com/in/wakeupkstnv",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/wakeupkstnv",
    href: "https://github.com/wakeupkstnv",
    icon: Github,
  },
  {
    label: "Phone",
    value: "+7-777-974-25-98",
    href: "tel:+77779742598",
    icon: Phone,
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <h2 className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">
        Contact
      </h2>

      <p className="text-muted-foreground mb-8 max-w-lg">
        {"If you'd like to discuss a project or just say hi, I'm always open to chat."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <Link
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <contact.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <p className="text-xs text-muted-foreground">{contact.label}</p>
              <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                {contact.value}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
