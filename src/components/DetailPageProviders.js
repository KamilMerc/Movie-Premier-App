import React from "react";
import { useState, useEffect } from "react";

const DetailPageProviders = (props) => {

    const [providersLink, setProvidersLink] = useState([])

    const providersUrl = `${process.env.REACT_APP_BASE_URL}${props.id}/watch/providers${process.env.REACT_APP_API_KEY}`

    async function getProviders() {
        await fetch(providersUrl)
            .then((res) => res.json())
            .then((data) => {
                setProvidersLink(data.results.US.link)
            })
    }

    useEffect(() => {
        getProviders()
    },[])

    return (
        <div className="providers">
            {typeof providersLink === typeof "string" ? <a className="providerBtn" href={providersLink} target="_blank" rel="noreferrer">Where watch?</a> : ""}
        </div>
    )
}

export default DetailPageProviders