import { useState } from "react"

const Table = ({  handleChange,itemToDelete,badList,entryList, handleSwitchTask, handleDelete}) => {

  
  
  return (
    <div className="row mt-5 p-5">
      <div className="col-md-6 p-3">
        <h3 className="text-center">Entry Lists</h3>
        {itemToDelete.length > 0 && (
          <div>
            <input
              className="form-check-input me-2 fs-5"
              type="checkbox"
              value="entry"
              onChange={handleChange}
              id="entryTasks"
            />
            <label className="form-check-label fs-5 mb-2" htmlFor="entryTasks">
              Select All
            </label>
          </div>
        )}
        <table className="table table-striped border ">
          <tbody id="entryList">
            {entryList.map((item, i) => {
              return (
                <tr key={item?._id}>
                  <td className="">
                    <span className="me-2">{i + 1}</span>
                    <input
                      type="checkbox"
                      className="form-check-input "
                      value={item?._id}
                      checked={itemToDelete?.includes(item?._id)}
                      onChange={handleChange}
                      style={{ border: '2px solid black' }}
                    />
                  </td>
                  <td className="">{item.task}</td>
                  <td className="">{item.hr}</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleSwitchTask(item?._id, 'bad')}
                      className="btn btn-success"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="col-md-6 p-3">
        <h3 className="text-center">Bad Lists</h3>
        {itemToDelete.length > 0 && (
          <div>
            <input
              className="form-check-input me-2 fs-5"
              type="checkbox"
              value="bad"
              id="badTasks"
              onChange={handleChange}
            />
            <label className="form-check-label fs-5 mb-2" htmlFor="badTasks">
              Select All
            </label>
          </div>
        )}
        <table className="table table-striped border">
          <tbody id="badList">
            {badList.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td className="  ">
                    <span className="me-2">{i + 1}</span>
                    <input
                      type="checkbox"
                      className="form-check-input "
                      value={item?._id}
                      checked={itemToDelete?.includes(item?._id)}
                      onChange={handleChange}
                      style={{ border: '2px solid black' }}
                    />
                  </td>
                  <td className="">{item.task}</td>
                  <td className="">{item.hr}</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleSwitchTask(item?._id, 'entry')}
                      className="btn btn-warning"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className=" bg-light p-2 rounded">
          You Could have saved{' '}
          <span id="savedHour">
            {badList.reduce((acc, item) => acc + parseInt(item.hr), 0)}
          </span>{' '}
          hours
        </div>
      </div>
      {itemToDelete.length > 0 && (
        <div className="  text-center">
          <button
            className="btn btn-danger w-50"
            onClick={() => handleDelete(itemToDelete)}
          >
            {itemToDelete.length} Tasks(s)
          </button>
        </div>
      )}
      {/* <!-- total Allocated hours --> */}
      <div className=" bg-light p-2 mt-3 rounded ">
        You have allocated{' '}
        <span id="totalHour">
          {badList.reduce((acc, item) => acc + parseInt(item.hr), 0) +
            entryList.reduce((acc, item) => acc + parseInt(item.hr), 0)}
        </span>{' '}
        hours
      </div>
    </div>
  )
}
export default Table