import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './Loading';
import { baseUrl } from '../shared/baseUrl';

const RenderCard = ({ item, isLoading, errMess }) => {
    console.log(item, isLoading, errMess);
    if (isLoading) {
        return <Loading />;
    } else if (errMess) {
        return <h4>{errMess}</h4>;
    } else if (item) {
        return (
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return null;
    }
};
const Home = ({
    dish,
    promotion,
    leader,
    dishesLoading,
    dishesErrMess,
    promoLoading,
    promoErrMess,
    leadersLoading,
    leadersErrMess,
}) => {
    return (
        <div className="row align-items-start">
            <div className="col-12 col-md m-1">
                <RenderCard item={dish} isLoading={dishesLoading} errMess={dishesErrMess} />
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={promotion} isLoading={promoLoading} errMess={promoErrMess} />
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={leader} isLoading={leadersLoading} errMess={leadersErrMess} />
            </div>
        </div>
    );
};
export default Home;
