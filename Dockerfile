#Giving the base image 
FROM node:20-alpine

#Creating the working directory
WORKDIR /app

#Copy the package.json and package-lock.json files
COPY package.*json ./

#Installing the dependencies
RUN npm install --legacy-peer-deps

#Copy rest files
COPY . .

#Run the Server on expose
EXPOSE 8001

#Run the Server
CMD [ "npm","start" ]


