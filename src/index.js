const { GraphQLServer } = require('graphql-yoga')                               //GraphQL Prisma server, change to Apollo in next commit
var links = [{                                                                  //static links storage
    id:'link-0',
    url:'www.howtographql.com',
    description:'Full stack tutorial for GraphQl'
}]
var idCount = links.length

const resolvers = {
    Query : {                                                                  //query resolver
        info : () => `This is API of a Hackernews Clone`,
        feed : () => links,
    }, 
    Mutation : {
        post : (parent,args) => {
            const link = {
                id: `link-${idCount++}`,
                description : args.description,
                url : args.url
            }
            links.push(link);
            return link
        },
        deleteLink : (parent,args) => {
            var obj = links.filter(link  => {
                return link.id == args.id
            })[0];
            var index = links.indexOf(obj);
            console.log(index);
            links.splice(index,1);
            return obj
        }
    },
    
}

const server = new GraphQLServer({
    typeDefs : './schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on localhost:4000`))