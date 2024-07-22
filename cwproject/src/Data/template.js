export const templates = [
    {
      id: 'basic',
      name: 'Basic',
      elements: [
        {
          id: 'header1',
          type: 'header',
          content: '<h1>Welcome to My Basic Website</h1>',
        },
        {
          id: 'paragraph1',
          type: 'paragraph',
          content: '<p>This is a simple website template. Customize it to fit your needs!</p>',
        },
        {
          id: 'image1',
          type: 'image',
          content: '<img src="https://via.placeholder.com/600x400" alt="Placeholder" />',
        },
      ],
      customizations: {
        backgroundColor: '#ffffff',
        color: '#333333',
        fontFamily: 'Arial, sans-serif',
      },
    },
    {
      id: 'business',
      name: 'Business',
      elements: [
        {
          id: 'header1',
          type: 'header',
          content: '<h1>Professional Business Solutions</h1>',
        },
        {
          id: 'paragraph1',
          type: 'paragraph',
          content: '<p>We provide cutting-edge solutions for your business needs.</p>',
        },
        {
          id: 'list1',
          type: 'list',
          content: '<ul><li>Consulting</li><li>Strategy</li><li>Implementation</li></ul>',
        },
        {
          id: 'button1',
          type: 'button',
          content: '<button>Contact Us</button>',
        },
      ],
      customizations: {
        backgroundColor: '#f0f0f0',
        color: '#1a1a1a',
        fontFamily: 'Helvetica, Arial, sans-serif',
      },
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      elements: [
        {
          id: 'header1',
          type: 'header',
          content: '<h1>My Creative Portfolio</h1>',
        },
        {
          id: 'paragraph1',
          type: 'paragraph',
          content: '<p>Showcasing my best work and projects.</p>',
        },
        {
          id: 'image1',
          type: 'image',
          content: '<img src="https://via.placeholder.com/300x300" alt="Project 1" />',
        },
        {
          id: 'image2',
          type: 'image',
          content: '<img src="https://via.placeholder.com/300x300" alt="Project 2" />',
        },
        {
          id: 'image3',
          type: 'image',
          content: '<img src="https://via.placeholder.com/300x300" alt="Project 3" />',
        },
      ],
      customizations: {
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        fontFamily: 'Roboto, sans-serif',
      },
    },
  ];