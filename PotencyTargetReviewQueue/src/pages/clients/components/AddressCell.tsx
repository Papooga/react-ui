import {IClient} from "../../../../types/clients.type.ts";
import React from "react";

interface IProps {
    client: IClient;
}
const AddressCell: React.FC<IProps> = ({client}) => {
    return (
        <div style={{ whiteSpace: 'normal', lineHeight: '1.5' }}>
            <div>{client.address1 || ''}</div>
            {client.address2 && <div>{client.address2}</div>}
            <div>{[client.city, client.state, client.postalCode].filter(Boolean).join(', ').trim()}</div>
        </div>
    );
};

export default AddressCell;