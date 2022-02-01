import { Request, Response, NextFunction } from 'express';
import { APIResponseProps } from '../types';

/**
 * @param {function} checkRequest - is a function that acts as a middleware to check for
 * required fields which the user does not provide
 * @param {string[]} checkFields - is the list of array of string fields which are to be
 * checked if missing is the request
 * */
export const checkRequest = (
  req: Request,
  res: Response<APIResponseProps>,
  next: NextFunction,
  checkFields: string[]
) => {
  try{
    let error = '';

    checkFields.map((field: string, fieldIndex: number) => {
      if (!req.body || !req.body[field] || req.body[field].length <= 0) {
        error += `${field} cannot be empty${
          checkFields.length - 1 !== fieldIndex ? ' \n ' : ''
        }`;
      }
    });
  
    if (error) {
      return res.status(200).json({
        status: 400,
        success: false,
        message: error,
      });
    } else {
      next();
    }

  }catch(err: unknown){
    return res.status(200).json({
      status: 500,
      success: false,
      //@ts-ignore
      message: err.message,
    });
  }
 
};

export const validateEmail = (email): boolean => {
  const valid = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return valid ? true : false;
};

export const capitalize = (text: string): string => {
  return text
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};
