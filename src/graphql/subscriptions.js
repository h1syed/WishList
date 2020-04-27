/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateWish = /* GraphQL */ `
  subscription OnCreateWish {
    onCreateWish {
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
export const onUpdateWish = /* GraphQL */ `
  subscription OnUpdateWish {
    onUpdateWish {
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
export const onDeleteWish = /* GraphQL */ `
  subscription OnDeleteWish {
    onDeleteWish {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
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
