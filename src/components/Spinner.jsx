import React from 'react'
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () =>
    <Dimmer active inverted>
        <Loader inverted content="ჩატვირთვა" />
    </Dimmer>

export default Spinner