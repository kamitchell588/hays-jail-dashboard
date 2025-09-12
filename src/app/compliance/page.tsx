import BrandHeader from '@/components/BrandHeader';
import BrandFooter from '@/components/BrandFooter';

export default function CompliancePage() {
  const securityItems = [
    {
      category: 'Transport Layer Security',
      status: 'Implemented',
      description: 'TLS 1.3 enforced for all connections. HTTPS redirect mandatory.',
      icon: '🔒',
      details: ['TLS 1.3 minimum', 'HSTS headers enabled', 'Certificate pinning']
    },
    {
      category: 'OWASP Top 10 Modeling',
      status: 'Implemented',
      description: 'Application designed with OWASP Top 10 security vulnerabilities addressed.',
      icon: '🛡️',
      details: ['Input validation', 'Authentication controls', 'Access control', 'Security logging']
    },
    {
      category: 'AWS GovCloud Planned',
      status: 'Architecture Ready',
      description: 'Infrastructure designed for AWS GovCloud deployment with FedRAMP compliance.',
      icon: '☁️',
      details: ['GovCloud-compatible services', 'Compliance-ready architecture', 'Data residency controls']
    },
    {
      category: 'CJIS Compliance',
      status: 'Aligned',
      description: 'Criminal Justice Information Systems compliance requirements addressed.',
      icon: '⚖️',
      details: ['Data encryption at rest/transit', 'Access audit logging', 'User background checks', 'Training requirements']
    },
    {
      category: 'FedRAMP Alignment',
      status: 'In Progress',
      description: 'Federal Risk and Authorization Management Program compliance preparation.',
      icon: '🏛️',
      details: ['Security controls catalog', 'Continuous monitoring', 'Incident response plan', 'Supply chain security']
    }
  ];

  const complianceFrameworks = [
    {
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 auditing for security, availability, and confidentiality',
      status: 'Planned'
    },
    {
      name: 'FISMA',
      description: 'Federal Information Security Management Act compliance for government systems',
      status: 'Architecture Ready'
    },
    {
      name: 'NIST Cybersecurity Framework',
      description: 'National Institute of Standards and Technology cybersecurity guidelines',
      status: 'Implemented'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Architecture Ready':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Planned':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BrandHeader />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Security & Compliance
            </h1>
            <p className="text-gray-600 mb-8">
              Security posture and compliance framework alignment
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security Posture</h2>
                <div className="space-y-6">
                  {securityItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.category}
                          </h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {item.description}
                      </p>
                      <div className="space-y-1">
                        {item.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center text-sm text-gray-500">
                            <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Compliance Frameworks</h2>
                <div className="space-y-6">
                  {complianceFrameworks.map((framework, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {framework.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(framework.status)}`}>
                          {framework.status}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {framework.description}
                      </p>
                    </div>
                  ))}
                  
                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-accent-800 mb-3">
                      Implementation Timeline
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-accent-700">Phase 1: Core Security</span>
                        <span className="text-xs text-accent-600">Complete</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-accent-700">Phase 2: GovCloud Migration</span>
                        <span className="text-xs text-accent-600">Q1 2024</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-accent-700">Phase 3: FedRAMP Authorization</span>
                        <span className="text-xs text-accent-600">Q2 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Data Protection & Privacy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔐</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                  <p className="text-sm text-gray-600">
                    AES-256 encryption for data at rest and in transit
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👤</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                  <p className="text-sm text-gray-600">
                    Role-based access with multi-factor authentication
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📋</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Audit Logging</h4>
                  <p className="text-sm text-gray-600">
                    Comprehensive logging of all system activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BrandFooter />
    </div>
  );
}