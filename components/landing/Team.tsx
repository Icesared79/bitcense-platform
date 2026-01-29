export function Team() {
  const team = [
    {
      name: 'Paul DiCesare',
      role: 'Founder & CEO',
      initials: 'PD',
      color: '#4A7C59',
    },
    {
      name: 'Joe Joyce',
      role: 'Co-Founder & CPO',
      initials: 'JJ',
      color: '#0f172a',
    },
    {
      name: 'Michael Orlandi',
      role: 'Co-Founder & CIO',
      initials: 'MO',
      color: '#4A7C59',
    },
    {
      name: 'Shane Fleming',
      role: 'Chief Strategy Officer',
      initials: 'SF',
      color: '#0f172a',
    },
    {
      name: 'Delia Sabau',
      role: 'Head of Capital Structuring',
      initials: 'DS',
      color: '#4A7C59',
    },
  ]

  return (
    <section id="team" className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[#4A7C59] font-semibold text-sm mb-4">
            Our Team
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] leading-tight">
            Leadership
          </h2>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            Experienced professionals bridging traditional finance and digital distribution.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative mx-auto mb-6">
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ backgroundColor: member.color }}
                />
                <div
                  className="relative w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto group-hover:scale-105 transition-all duration-300 shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}dd 100%)`,
                    boxShadow: `0 10px 40px -10px ${member.color}60`,
                  }}
                >
                  {member.initials}
                </div>
              </div>
              <h3 className="font-bold text-[#0f172a] text-lg">{member.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
