import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "/api/placeholder/40/40",
    content: "re:interview helped me practice for my Google interview. The AI feedback was incredibly detailed and helped me identify areas I needed to work on.",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager at Microsoft",
    avatar: "/api/placeholder/40/40", 
    content: "The presentation practice feature is amazing. I used it to prepare for a board presentation and felt so much more confident.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Data Scientist at Netflix",
    avatar: "/api/placeholder/40/40",
    content: "Practicing technical interviews with AI agents that understand the context was a game-changer for my career transition.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by Professionals
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            See what our users say about their experience with re:interview.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
