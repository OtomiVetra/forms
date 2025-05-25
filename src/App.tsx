import Signin from './components/Signin';
import Signup from './components/Signup';

const App: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-6xl flex gap-8'>
        <div className='w-1/2'>
          <Signin
            onSubmit={(data) => console.log('Поля формы:', data)}
          />
        </div>

        <div className='w-1/2'>
          <Signup
            onSubmit={(data) => console.log('Регистрация:', data)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
