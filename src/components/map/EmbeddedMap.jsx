import React from 'react'
import './EmbeddedMap.css'

const EmbeddedMap = () => {
    return (
        <div className='map-responsive map-responsive iframe my-5'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63320.41806481885!2d80.5844958207122!3d7.294628564856129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x411a3818a1e03c35!2sKandy!5e0!3m2!1sen!2slk!4v1729478902561!5m2!1sen!2slk" width="600" height="450"
            
           allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
           title="Embedded Map"
           ></iframe>




        </div>
    )
}

export default EmbeddedMap