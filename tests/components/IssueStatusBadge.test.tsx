import { render, screen } from '@testing-library/react'
import IssueStatusBadge from '../../app/components/IssueStatusBadge'
import React from 'react';
import { Status } from '@prisma/client';

describe('IssueStatusBadge', () => {
    it.each([
        {label: /Open/i, value: "OPEN"},
        {label: /In Progress/i, value: "IN_PROGRESS"},
        {label: /Closed/i, value: "CLOSED"},
    ])('should render a $label badge if status is OPEN', ({label,value}) => {
        render(<IssueStatusBadge status={value as Status} />);

        expect(screen.getByText(label)).toBeInTheDocument();
    });
});