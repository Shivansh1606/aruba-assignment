import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';

function Blog() {
  const navigate = useNavigate();

  const posts = [
    {
      title: '10 Best Practices for Web Development in 2025',
      excerpt: 'Learn the latest best practices and trends in modern web development...',
      author: 'Sanjay Mishra',
      date: 'Oct 15, 2025',
      category: 'Development',
      image: '🌐'
    },
    {
      title: 'How to Scale Your SaaS Business',
      excerpt: 'Essential strategies for scaling your SaaS business from startup to enterprise...',
      author: 'Priya Sharma',
      date: 'Oct 12, 2025',
      category: 'Business',
      image: '📈'
    },
    {
      title: 'The Future of Cloud Computing',
      excerpt: 'Exploring upcoming trends and technologies in cloud computing...',
      author: 'Rahul Verma',
      date: 'Oct 10, 2025',
      category: 'Technology',
      image: '☁️'
    },
    {
      title: 'Building Secure Applications: A Complete Guide',
      excerpt: 'Learn how to build secure applications from the ground up...',
      author: 'Anjali Singh',
      date: 'Oct 8, 2025',
      category: 'Security',
      image: '🔒'
    },
    {
      title: 'UI/UX Design Trends for 2025',
      excerpt: 'The latest design trends that will dominate the digital landscape...',
      author: 'Sanjay Mishra',
      date: 'Oct 5, 2025',
      category: 'Design',
      image: '🎨'
    },
    {
      title: 'Optimizing Database Performance',
      excerpt: 'Tips and tricks for optimizing your database queries and performance...',
      author: 'Priya Sharma',
      date: 'Oct 2, 2025',
      category: 'Development',
      image: '💾'
    }
  ];

  const categories = ['All', 'Development', 'Business', 'Technology', 'Security', 'Design'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl font-bold text-blue-600">Aruba Network</h1>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Insights, tutorials, and updates from the Aruba Network team
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition font-semibold"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center text-8xl">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 space-x-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 space-x-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 font-semibold">
                      <span>Read More</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get the latest articles and updates delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
