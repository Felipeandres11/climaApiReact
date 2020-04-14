import React from 'react';

import './form.style.css';

const Form = props => {
    return (
        <div className="container text-white py-4">

              <form onSubmit={props.loadweather}>
                    <div>{props.error ? error() : null}</div>
                    <div className="row justify-content-center">
                        <div className="col-md-4 offset-md-2">
                            <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City"/>
                        </div>

                        <div className="col-md-4">
                        <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country"/>
                        </div>

                        <div className="col-md-2 mt-md-0 text-md-left">
                        <button className="btn btn-danger text-light p-1 m-1"> Obtener Clima </button>
                        </div>
                    </div>

              </form>

            

        </div>
    );
}


function error(){
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country
        </div>
    )
}
export default Form;