import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
  .then(function (response) {
    console.log('Comments:', response.data);
  })
  .catch(function (error) {
    console.error('Error:', error);
  });

  