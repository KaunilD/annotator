# Annotator
#### Annotate objects in your own, curated dataset using Annotator.
![alt text](https://raw.githubusercontent.com/KaunilD/annotator/master/public/assets/0.png)
1. Load all the images in your dataset.
![alt text](https://raw.githubusercontent.com/KaunilD/annotator/master/public/assets/1.png)
2. Draw bounding boxes around each of the objects.
3. A `.json` with `filename as keys` and corresponding `array of bounding boxes in each image file will be generated`.

   Example :
   ```javascript
   "20170504_144321.jpg":[
    {
    /*      [x,  y,  w,   h  ]*/
    "bbox": [10, 24, 304, 206],
    "class": 1
    },
    {
    "bbox": [32, 42, 102, 322],
    "class": 2
    }
   ]
   ```
