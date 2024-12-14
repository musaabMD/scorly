export const categories = [
    {
      id: 'ems',
      title: 'EMS',
      icon: 'Activity',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'hover:border-red-500'
    },
    // Add other categories...
  ];
  
  export const examsByCategory = {
    'ems': [
      {
        id: 'firefighter-1-2',
        title: 'Firefighter I & II',
        subtitle: 'Firefighter',
        questions: 1000
      },
      {
        id: 'nremt-aemt',
        title: 'NREMT® AEMT',
        subtitle: 'Advanced Emergency Medical Technician',
        questions: 900
      },
      {
        id: 'ibsc-ccp-c',
        title: 'IBSC CCP-C®',
        subtitle: 'Critical Care Paramedic-Certified',
        questions: 400
      },
      {
        id: 'ibsc-fp-c',
        title: 'IBSC FP-C®',
        subtitle: 'Certified Flight Paramedic',
        questions: 1000
      },
      {
        id: 'nremt-emr',
        title: 'NREMT® EMR',
        subtitle: 'Emergency Medical Responder',
        questions: 500
      }
    ]
    // Add other categories...
  };