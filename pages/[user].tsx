import PortfolioContainer from '@/components/Portfolio/Container';
import PortfolioLayout from '@/components/Portfolio/Layout';
import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  console.log(router);
  return(
    <PortfolioLayout>
      <PortfolioContainer />
    </PortfolioLayout>
  )
}