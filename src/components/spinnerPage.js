import Spinner from 'react-bootstrap/Spinner';


export default function SpinnerPage() {


    return (
        <div className="d-flex flex-column h-100 center">
            <div className="p-2 flex-fill"></div>
            <div class="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
            </div>
            <div className="p-2 flex-fill"></div>
        </div>
    )
}