import BrandHeader from '@/components/BrandHeader';
import BrandFooter from '@/components/BrandFooter';

export default function TrainingPage() {
  const trainingSteps = [
    {
      title: '1. Upload CSV Data',
      description: 'Navigate to the Admin page and upload your jail population CSV file. Ensure data follows the required format with all necessary columns.',
      icon: '📁'
    },
    {
      title: '2. Use Date Filters',
      description: 'Select date ranges on the main dashboard to focus on specific time periods. Filters apply to all charts and KPIs automatically.',
      icon: '📅'
    },
    {
      title: '3. View KPIs and Charts',
      description: 'Monitor key metrics including total population, pretrial percentage, average length of stay, and daily admissions/releases.',
      icon: '📊'
    },
    {
      title: '4. Export Filtered Data',
      description: 'Use the "Download CSV" button to export the currently filtered dataset. File includes date range in filename for easy identification.',
      icon: '📋'
    },
    {
      title: '5. Print Dashboard Reports',
      description: 'Use your browser\'s print function (Ctrl/Cmd+P) to generate PDF reports of the current dashboard view.',
      icon: '🖨️'
    },
    {
      title: '6. Monitor Demographics (Demo)',
      description: 'In demo mode, view additional charts showing race, gender, and age distributions derived from total population data.',
      icon: '👥'
    }
  ];

  const supportItems = [
    {
      title: 'Technical Support',
      description: 'Contact your system administrator for technical issues or data upload problems.',
      contact: 'admin@hayscountytx.gov'
    },
    {
      title: 'Training Resources',
      description: 'Access additional training materials and video tutorials for advanced features.',
      contact: 'training.portal.link'
    },
    {
      title: 'Data Format Questions',
      description: 'Questions about CSV format requirements or data field specifications.',
      contact: 'data-support@vendor.com'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BrandHeader />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Training & Support
            </h1>
            <p className="text-gray-600 mb-8">
              Learn how to use the jail dashboard effectively
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Getting Started</h2>
                <div className="space-y-6">
                  {trainingSteps.map((step, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start space-x-4">
                        <span className="text-2xl">{step.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Support Resources</h2>
                <div className="space-y-6">
                  {supportItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {item.description}
                      </p>
                      <div className="text-sm">
                        <span className="font-medium text-brand-600">
                          {item.contact}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-brand-800 mb-2">
                      Quick Reference
                    </h3>
                    <ul className="text-sm text-brand-700 space-y-1">
                      <li>• CSV format: 11 columns with headers</li>
                      <li>• Date format: YYYY-MM-DD</li>
                      <li>• File size limit: 10MB max</li>
                      <li>• Update frequency: Daily recommended</li>
                      <li>• Data retention: 2 years default</li>
                    </ul>
                  </div>
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