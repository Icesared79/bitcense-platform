export function Team() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former VP at Goldman Sachs with 15+ years in asset management.',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      bio: 'Previously led engineering teams at Square and Stripe.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Valuations',
      bio: 'Certified appraiser with expertise in commercial real estate.',
    },
    {
      name: 'David Thompson',
      role: 'Director of Operations',
      bio: 'Operations expert with background in Fortune 500 consulting.',
    },
    {
      name: 'Lisa Park',
      role: 'Client Success Lead',
      bio: 'Dedicated to ensuring every client achieves their financing goals.',
    },
  ]

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Meet Our Team
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Experienced professionals dedicated to helping you succeed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
