import PortfolioContainer from '@/components/Portfolio/Container';
import PortfolioLayout from '@/components/Portfolio/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function UserPortfolio() {
  return (
    <>
      <PortfolioLayout>
        <PortfolioContainer />
      </PortfolioLayout>
    </>

  );
}
