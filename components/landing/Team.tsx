export function Team() {
  const team = [
    {
      name: 'Paul DiCesare',
      role: 'Founder & CEO',
      initials: 'PD',
    },
    {
      name: 'Joe Joyce',
      role: 'Co-Founder & CPO',
      initials: 'JJ',
    },
    {
      name: 'Michael Orlandi',
      role: 'Co-Founder & CIO',
      initials: 'MO',
    },
    {
      name: 'Shane Fleming',
      role: 'Chief Strategy Officer',
      initials: 'SF',
    },
    {
      name: 'Delia Sabau',
      role: 'Head of Capital Structuring',
      initials: 'DS',
    },
  ]

  return (
    <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#4A7C59] font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Leadership
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experienced professionals bridging traditional finance and digital distribution.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {team.map((member, index) => (
            <div key={member.name} className="text-center group">
              <div className="relative mx-auto mb-4">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto group-hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: [
                      '#4A7C59',
                      '#3B5998',
                      '#6B7280',
                      '#0077B5',
                      '#7C3AED',
                    ][index],
                  }}
                >
                  {member.initials}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
