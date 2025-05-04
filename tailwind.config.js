/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      'poppins':'Poppins, sans-serif',
      'openSans':'Open Sans, sans-serif'
    },
    extend: {
      colors:{
        green1:'#46760A',
        green2:'#6A983C',
        green3:'#92C064',
        green4:'#C8DEB3',
        green5:'#F4F8EC'
      },
      keyframes:{
        modalBgShow:{
          '0%':{opacity:'0'},
          '100%':{opacity:'1'}
        },
        modalShow:{
          '0%':{
            transform:'translateY(20px)',
            opacity:'0'
          },
          '100%':{
            transform:'translateY(0)',
            opacity:'1'
          }
        },
        
      },
      animation:{
        'modalShow':'modalShow 0.2s linear 1',
        'modalBgShow':'modalBgShow 0.2s linear 1',
      }
    },
  },
  plugins: [],
}

