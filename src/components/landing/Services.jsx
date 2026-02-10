import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function CardImage({ src, title, description }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img src={src} className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40" />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default function Services() {
  const services = [
    {
      src: "/img/services_section/1.jpg",
      title: "Truckload & Partial",
      description:
        "Ordinary shipments make up the majority of freight on the road, and the majority of what we do. We have the ability to adapt and adjust for cost, time, or procedural optimization without sacrificing quality.",
    },
    {
      src: "/img/services_section/2.jpg",
      title: "Over-Dimension",
      description:
        "Navigating oversize shipments can be a major headache. Every state has different rules and regulations for overweight and over-dim shipments. K1 has a proven track record and a close network of specialized and highly experienced operators.",
    },
    {
      src: "/img/services_section/3.jpg",
      title: "Expedited",
      description:
        "Our attention to detail and constant contact updates provides peace of mind that your critical shipment is on time, every time.\n\nNo mistakes.",
    },
  ];

  return (
    <main>
      <section className="border-white border">
        <div className="border-white border-1 h-screen p-5">
          Services Section
          <div className={"flex-col border-white border p-5"}>
            <div className="text-center text-5xl border-white border p-5">Tailored Solutions, Exceptional Results</div>
            <div className="flex flex-row border-white border p-5">
              {services.map((s) => (
                <CardImage key={s.title} src={s.src} title={s.title} description={s.description} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
