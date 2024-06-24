import { vi } from 'vitest'
import Pagination from '../../app/components/Pagination';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AllProviders from '../AllProviders';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

vi.mock('next/navigation');

describe('Pagination', () => {
    let itemCount: number;
    let pageSize: number;
    let currentPage: number;


    beforeEach(() => {
        itemCount = 20;
        pageSize = 10;
        currentPage = 1;
    });

    const setParams = (params:string) => {
        vi.mock('next/navigation', () => {
            return{
                useSearchParams: vi.fn().mockReturnValue(params)
            }
        })
    }

    const renderComponent = () => {
        render(
            <Pagination itemCount={itemCount} pageSize={pageSize} currentPage={currentPage} />,
            {wrapper: AllProviders}
            );

        const getPageControls = () => ({
            firstButton: screen.queryByRole('button', {name: 'firstButton'}),
            previousButton: screen.queryByRole('button', {name: 'previousButton'}),
            nextButton: screen.queryByRole('button', {name: 'nextButton'}),
            lastButton: screen.queryByRole('button', {name: 'lastButton'})
        });

        const expectPageControlsToBeInTheDocument = () => {
            const { firstButton, previousButton, lastButton, nextButton} = getPageControls();
            expect(screen.getByText(/page/i)).toBeInTheDocument();
            expect(firstButton).toBeInTheDocument();
            expect(previousButton).toBeInTheDocument();
            expect(lastButton).toBeInTheDocument();
            expect(nextButton).toBeInTheDocument();
        }

        return {
            getPageControls,
            expectPageControlsToBeInTheDocument
        }
    }

    it('should render nothing if the numer of items is under page size', () => {
        itemCount = 5;
        renderComponent();
        expect(screen.queryByText(/page/i)).not.toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
    
    it('should render page and arrow icons if the numer of items is larger than page size', () => {
        const { expectPageControlsToBeInTheDocument } = renderComponent();
        expectPageControlsToBeInTheDocument();
    });

    it.each([
        {page: 1, skip: "previoys", arrow: "first"},
        {page: 2, skip: "next", arrow: "last" },
    ])('should disable $arrow and $skip button if current page is $page ', ({page, skip ,arrow}) => {
        setParams('page=2');
    });



})