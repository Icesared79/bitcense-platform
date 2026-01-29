export function Team() {
  const team = [
    {
      name: 'Paul DiCesare',
      role: 'Founder & CEO',
      initials: 'PD',
      bg: 'bg-[#15803d]',
      shadowColor: '#15803d',
      border: false,
    },
    {
      name: 'Joe Joyce',
      role: 'Co-Founder & CPO',
      initials: 'JJ',
      bg: 'bg-[#0f172a]',
      shadowColor: '#0f172a',
      border: true,
    },
    {
      name: 'Michael Orlandi',
      role: 'Co-Founder & CIO',
      initials: 'MO',
      bg: 'bg-[#15803d]',
      shadowColor: '#15803d',
      border: false,
    },
    {
      name: 'Shane Fleming',
      role: 'Chief Strategy Officer',
      initials: 'SF',
      bg: 'bg-[#0f172a]',
      shadowColor: '#0f172a',
      border: true,
    },
    {
      name: 'Delia Sabau',
      role: 'Head of Capital Structuring',
      initials: 'DS',
      bg: 'bg-[#15803d]',
      shadowColor: '#15803d',
      border: false,
    },
  ]

  return (
    <section id="team" className="py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-white relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
            Leadership
          </h2>
          <p className="mt-6 text-xl text-[#334155] leading-relaxed">
            Experienced professionals bridging traditional finance and digital distribution.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative mx-auto mb-6">
                <div
                  className={`w-24 h-24 lg:w-28 lg:h-28 ${member.bg} rounded-full flex items-center justify-center text-white font-bold text-2xl lg:text-3xl mx-auto transition-all duration-200 group-hover:scale-105 ${member.border ? 'ring-2 ring-[#e2e8f0]' : ''}`}
                  style={{
                    boxShadow: `0 20px 40px -12px ${member.shadowColor}50`,
                  }}
                >
                  {member.initials}
                </div>
              </div>
              <h3 className="font-bold text-[#0f172a] text-lg">{member.name}</h3>
              <p className="text-base text-[#64748b] mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
