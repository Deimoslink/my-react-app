import React from 'react';
import './Pagination.css';

class Pagination extends React.Component {

    pageSizes = [10, 20, 50];

    constructor(props) {
        super(props);
        this.state = {
            pageButtons: this.calculatePageButtons(props),
            currentPage: props.offset / props.limit + 1
        };
    }

    calculatePageButtons = (props) => {
        const currentPage = props.offset / props.limit + 1;
        const lastPage = Math.ceil(props.total / props.limit);
        console.log('currentPage:', currentPage);
        console.log('lastPage:', lastPage);

        if (currentPage <= 3) {
            return [1, 2, 3, 4, 5].filter(page => page <= lastPage)
        } else if (currentPage >= lastPage - 2) {
            return [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage].filter(page => page >= 1)
        } else {
            return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
        }
    };

    calculateOffset = (pageNumber) => {
        return (pageNumber - 1) * this.props.limit;
    };

    pageChanged = (pageNumber) => {
        this.props.onPageChange(this.calculateOffset(pageNumber));
    };

    componentWillReceiveProps(props) {
        this.setState({
            pageButtons: this.calculatePageButtons(props),
            currentPage: props.offset / props.limit + 1,
            lastPage: Math.ceil(props.total / props.limit)
        })
    }


    render() {
        return (
            <div className="Pagination d-flex flex-column">
                <div className="control-panel d-flex justify-content-between mb-2">
                    <div className="btn-group" role="group">
                        {this.pageSizes.map(el => {
                            return <button type="button"
                                           key={el}
                                           onClick={() => {this.props.onPageSizeChange(el)}}
                                           className={this.props.limit === el ? 'btn btn-secondary' : 'btn btn-outline-secondary'}>{el}</button>
                        })}
                    </div>
                    <ul className="pagination m-0">
                        <li className={this.state.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                            <button disabled={this.state.currentPage === 1}
                                    className="page-link" onClick={() => {this.pageChanged(this.state.currentPage - 1)}}>Prev</button>
                        </li>
                        {this.state.pageButtons.map(page => {
                            return (
                                <li className={this.state.currentPage === page ? 'page-item active' : 'page-item'} key={page}>
                                    <button className="page-link" onClick={() => {this.pageChanged(page)}}>{page}</button>
                                </li>
                                )
                        })}
                        <li className={this.state.currentPage === this.state.lastPage ? 'page-item disabled' : 'page-item'}>
                            <button disabled={this.state.currentPage === this.state.lastPage}
                                    className="page-link" onClick={() => {this.pageChanged(this.state.currentPage + 1)}}>Next</button>
                        </li>
                    </ul>
                </div>

                <div className="control-panel d-flex justify-content-between">
                    <span className="badge badge-pill badge-secondary">found {this.props.total} results</span>
                    <span className="badge badge-pill badge-secondary">total {Math.ceil(this.props.total / this.props.limit)} pages</span>
                </div>
            </div>
        );
    }

}

export default Pagination;
