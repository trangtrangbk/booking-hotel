import React from 'react';
import '../../scss/components/_table.scss';
class FilterTable extends React.Component {
  state = {
    nCol: 7
  };
  render() {
    const content = this.props.tableData.length ? (
      this.props.tableData
    ) : (
      <tr className="text-center">
        <td colSpan={this.state.nCol}>
          <h4>No reservation found</h4>
        </td>
      </tr>
    )

    return (
      <div className="row TableComponent">
          <table
            className="table table-bordered table-hover"
            id="personal-pto-request-table">
            <thead>
              <tr>
                <th className="text-center">Code</th>
                <th className="text-center">Room</th>
                <th className="text-center">Email</th>
                <th className="text-center">Check In</th>
                <th className="text-center">Check Out</th>
                <th className="text-center">Total days</th>
                <th className="text-center">Status</th>
                <th className="text-center">Create At</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
      </div>
    );
  }
}

export default FilterTable;
