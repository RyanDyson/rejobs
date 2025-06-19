export function Stats() {
  const stats = [
    {
      number: "10K+",
      label: "Practice Sessions",
      description: "Completed by our users",
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Users report improved confidence",
    },
    {
      number: "500+",
      label: "Companies",
      description: "Scenarios available",
    },
    {
      number: "24/7",
      label: "Availability",
      description: "AI agents ready anytime",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-blue-300 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-zinc-400">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
