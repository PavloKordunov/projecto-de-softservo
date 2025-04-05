package com.proj.forum.aspect;

import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.enums.RoleType;
import com.proj.forum.exception.TokenTypeException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import javax.security.sasl.AuthenticationException;
import java.nio.file.AccessDeniedException;
import java.util.Arrays;
import java.util.List;

@Aspect
@Component
@Slf4j
public class AuthorizationAspect {

    @Around("@annotation(requireRole)")
    public Object checkAccessAdvice(ProceedingJoinPoint joinPoint, RequireRoles requireRole) throws Throwable{

        Jwt jwt = getJwt();
        List<String> roles = jwt.getClaimAsStringList("groups");
        if (roles == null)
            throw new AccessDeniedException("User doesn't have roles");

        List<String> roleValues = Arrays
                .stream(requireRole.value())
                .map(RoleType::getValue)
                .toList();

        if (roles.stream().noneMatch(s -> roleValues.stream().anyMatch(s::contains))) {
            throw new AccessDeniedException("User doesn't have permission to use it");
        }

        return joinPoint.proceed();
    }

    private static Jwt getJwt() throws AuthenticationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            throw new AuthenticationException("User isn't authenticated");
        }
        if (!(authentication instanceof JwtAuthenticationToken jwtAuthToken)) {
            throw new TokenTypeException("Type of token isn't jwt");
        }
        return  (Jwt) jwtAuthToken.getPrincipal();


    }
}
