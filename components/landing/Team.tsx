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
      color: '#3B5998',
    },
    {
      name: 'Michael Orlandi',
      role: 'Co-Founder & CIO',
      initials: 'MO',
      color: '#6366F1',
    },
    {
      name: 'Shane Fleming',
      role: 'Chief Strategy Officer',
      initials: 'SF',
      color: '#0EA5E9',
    },
    {
      name: 'Delia Sabau',
      role: 'Head of Capital Structuring',
      initials: 'DS',
      color: '#8B5CF6',
    },
  ]

  return (
    <section id="team" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4A7C59]/20 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 bg-[#4A7C59]/10 rounded-full text-[#4A7C59] font-semibold text-sm uppercase tracking-wider">
            Our Team
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Leadership
          </h2>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            Experienced professionals bridging traditional finance and digital distribution.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative mx-auto mb-6">
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ backgroundColor: member.color }}
                />
                <div
                  className="relative w-28 h-28 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto group-hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}dd 100%)`,
                    boxShadow: `0 10px 40px -10px ${member.color}50`,
                  }}
                >
                  {member.initials}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
