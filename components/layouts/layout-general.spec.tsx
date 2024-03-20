import {render, screen} from '@testing-library/react'
import LayoutGeneral from "integrador/components/layouts/layout-general.component";

jest.mock('integrador/components/layouts/header/general-header.component', () => () => {
    return <div>Header</div>;
});
jest.mock('integrador/components/layouts/footer/general-footer.component', () => () => {
    return <div>Footer</div>;
});

describe('LayoutGeneral', () => {
    describe('when rendering default', () => {
        it('should render the children', () => {
            render(<LayoutGeneral><p>children</p></LayoutGeneral>)
            const children = screen.getByText('children')
            expect(children).toBeInTheDocument()
        })
        it('should render the header', () => {
            render(<LayoutGeneral><p>children</p></LayoutGeneral>)
            const header = screen.getByText('Header')
            expect(header).toBeInTheDocument()
        })
        it('should render the footer', () => {
            render(<LayoutGeneral><p>children</p></LayoutGeneral>)
            const footer = screen.getByText('Footer')
            expect(footer).toBeInTheDocument()
        })
    })
})