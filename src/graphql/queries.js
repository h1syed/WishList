/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      registered
      owner
      wishes {
        items {
          id
          wishOwnerId
          wishOwnerUsername
          wishTitle
          wishBody
          owner
          createdAt
        }
        nextToken
      }
      friends {
        id
        username
        email
        registered
        owner
        wishes {
          nextToken
        }
        friends {
          id
          username
          email
          registered
          owner
        }
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        registered
        owner
        wishes {
          nextToken
        }
        friends {
          id
          username
          email
          registered
          owner
        }
      }
      nextToken
    }
  }
`;
export const getWish = /* GraphQL */ `
  query GetWish($id: ID!) {
    getWish(id: $id) {
      user {
        id
        username
        email
        registered
        owner
        wishes {
          nextToken
        }
        friends {
          id
          username
          email
          registered
          owner
        }
      }
      id
      wishOwnerId
      wishOwnerUsername
      wishTitle
      wishBody
      owner
      createdAt
      likes {
        items {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
        }
        nextToken
      }
    }
  }
`;
export const listWishs = /* GraphQL */ `
  query ListWishs(
    $filter: ModelWishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWishs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user {
          id
          username
          email
          registered
          owner
        }
        id
        wishOwnerId
        wishOwnerUsername
        wishTitle
        wishBody
        owner
        createdAt
        likes {
          items{
            id
            numberLikes
            likeOwnerId
            likeOwnerUsername
          }
        }
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      wish {
        user {
          id
          username
          email
          registered
          owner
        }
        id
        wishOwnerId
        wishOwnerUsername
        wishTitle
        wishBody
        owner
        createdAt
        likes {
          nextToken
        }
      }
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
        wish {
          id
          wishOwnerId
          wishOwnerUsername
          wishTitle
          wishBody
          owner
          createdAt
        }
      }
      nextToken
    }
  }
`;
