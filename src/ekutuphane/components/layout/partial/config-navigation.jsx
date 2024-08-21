import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Books Panel',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Users Panel',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'books',
    path: '/Book',
    icon: icon('ic_cart'),
  },
  {
    title: 'My Books',
    path: '/MyBooks',
    icon: icon('ic_cart'),
  }

];
export default navConfig;
