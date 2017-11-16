import React, { Component } from 'react';

var dir = require('node-dir');
class ImageGallery extends Component{

    render(){
        dir.readFiles(
            '/Users/kaunildhruv/Pictures/WWF/Pandas/',
            function(err, content, next){
                console.log(content);
                next();
            },
            function(err, files){
                console.log('finished reading list ', files );
            }
        );
        return (
            <div>

            </div>
        );
    }
}


export default ImageGallery;
