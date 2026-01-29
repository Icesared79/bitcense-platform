export function Team() {
  const team = [
    {
      name: 'Paul DiCesare',
      role: 'Founder & CEO',
      initials: 'PD',
      color: '#15803d',
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
      color: '#15803d',
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
      color: '#15803d',
    },
  ]

  return (
    <section id="team" className="py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-white">
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
                  className="w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-white font-bold text-2xl lg:text-3xl mx-auto shadow-xl group-hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundColor: member.color,
                    boxShadow: `0 20px 40px -12px ${member.color}50`,
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
