import { Button } from '@material-ui/core'
import React from 'react'

export default function Link({link}) {
    return (
        <div>
            <Button color="primary" component={"a"} href={link.link} title={link.description}>{link.name}</Button>
        </div>
    )
}
