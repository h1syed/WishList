/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createWish = /* GraphQL */ `
  mutation CreateWish(
    $input: CreateWishInput!
    $condition: ModelWishConditionInput
  ) {
    createWish(input: $input, condition: $condition) {
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
export const updateWish = /* GraphQL */ `
  mutation UpdateWish(
    $input: UpdateWishInput!
    $condition: ModelWishConditionInput
  ) {
    updateWish(input: $input, condition: $condition) {
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
export const deleteWish = /* GraphQL */ `
  mutation DeleteWish(
    $input: DeleteWishInput!
    $condition: ModelWishConditionInput
  ) {
    deleteWish(input: $input, condition: $condition) {
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
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
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
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
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
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
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
