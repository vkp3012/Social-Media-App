const responseWithData = (res,statusCode,data) => res.status(statusCode).json(data);

// error handle 
const error = (res) => responseWithData(res,500,{
    status : 500,
    massage : "Oops! Something Went to Wrong."
})

// bad Request send
const bedRequest = (res,massage) => responseWithData(res,400,{
    status : 400,
    massage
})

// all good
const ok = (res,data) => responseWithData(res,200,data);

// create a data..
const created = (res,data) => responseWithData(res,201,data);


// unauthorize user
const unauthorize = (res) => responseWithData(res,401,{
    status : 401,
    massage : "unauthorize"
})

// not found...
const notFound = (res) => responseWithData(res,404,{
    status : 404,
    massage : "Resource is found"
})



export default {
    responseWithData,
    error,
    bedRequest,
    ok,
    created,
    unauthorize,
    notFound
}