package com.proj.forum.aspect;

import com.proj.forum.annotation.RequireRoles;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Aspect
@Component
@Slf4j
public class AuthorizationAspect {

    @Around("@annotation(requireRole)")
    public Object checkAccessAdvice(ProceedingJoinPoint proceedingJoinPoint, RequireRoles requireRole) throws Throwable{

        Jwt jwt = getJwt();
        List<String> roles = jwt.getClaimAsStringList("groups"); // <- certainly "groups"?
        if (roles == null)
            throw new AccessDeniedException("User doesn't have roles"); //TODO create custom ex

        Set<String> requiredRoles = new HashSet<>(Arrays.asList(requireRole.value()));

        if(requiredRoles.stream().noneMatch(requiredRoles::contains))
            throw new AccessDeniedException("User doesn't have permission to use it");

        return proceedingJoinPoint.proceed();
    }

    private static Jwt getJwt() throws AuthenticationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Authentication class: {}", authentication.getClass().getName());

        // is guest
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            throw new AuthenticationException("User isn't authentication");
        }
        if (!(authentication instanceof JwtAuthenticationToken jwtAuthToken)) {
            throw new TokenTypeException("Type of token isn't jwt");
        }
        return  (Jwt) jwtAuthToken.getPrincipal();


    }
}
