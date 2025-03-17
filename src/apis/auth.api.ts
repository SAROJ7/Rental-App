import { axiosInstance } from "@/providers";
import { Manager, Tenant } from "@/types/prismaTypes";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

type UserRole = "manager" | "tenant";
type UserInfo = Tenant | Manager;

interface AuthUser {
  cognitoInfo: any;
  userInfo: UserInfo;
  userRole: UserRole;
}

export const getAuthUser = async (): Promise<{
  data?: AuthUser;
  error?: string;
}> => {
  try {
    const [session, user] = await Promise.all([
      fetchAuthSession(),
      getCurrentUser(),
    ]);

    const { idToken } = session.tokens ?? {};
    const userRole = idToken?.payload["custom:role"] as UserRole;

    // Fetch or create user details from database
    const userInfo = await fetchOrCreateUserDetails(user, userRole);

    return {
      data: {
        cognitoInfo: { ...user },
        userInfo,
        userRole,
      },
    };
  } catch (error: any) {
    return { error: error.message || "Could not fetch user data" };
  }
};

/**
 * Fetches user details from the database or creates a new user if not found
 * @param user Cognito user object
 * @param userRole User role (manager or tenant)
 * @returns User information from database
 */
async function fetchOrCreateUserDetails(
  user: any,
  userRole: UserRole
): Promise<UserInfo> {
  const endpoint = getUserEndpoint(userRole, user.userId);

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data as UserInfo;
  } catch (error: any) {
    if (error.response?.status === 404) {
      const createResponse = await createNewUserInDatabase(user, userRole);
      return createResponse.data as UserInfo;
    }
    throw error;
  }
}

async function createNewUserInDatabase(user: any, userRole: UserRole) {
  const endpoint = userRole === "manager" ? "/managers" : "/tenants";

  return axiosInstance.post(endpoint, {
    cognitoId: user.userId,
    name: user.username,
    email: user.signInDetails?.loginId || "",
    phoneNumber: "",
  });
}

function getUserEndpoint(userRole: UserRole, userId: string): string {
  return userRole === "manager" ? `/managers/${userId}` : `/tenants/${userId}`;
}
