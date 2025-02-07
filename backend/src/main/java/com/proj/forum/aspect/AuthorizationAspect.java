package com.proj.forum.aspect;

import com.proj.forum.annotation.RequireRoles;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Aspect
@Component
public class AuthorizationAspect {

    @Around("@annotation(requireRole)")
    public Object checkAccess(ProceedingJoinPoint proceedingJoinPoint, RequireRoles requireRole) throws Throwable{
        JwtAuthenticationToken authenticationToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        if(authenticationToken == null)
            throw new SecurityException("Not auth"); //TODO create custom ex

        Jwt jwt = (Jwt) authenticationToken.getPrincipal();
        List<String> roles = jwt.getClaimAsStringList("groups"); // <- certainly "groups"?
        if (roles == null)
            throw new SecurityException("User doesn't have roles"); //TODO create custom ex

        Set<String> requiredRoles = new HashSet<>(Arrays.asList(requireRole.value()));

        if(requiredRoles.stream().noneMatch(requiredRoles::contains))
            throw new SecurityException("User doesn't have permission to use it");

        return proceedingJoinPoint.proceed();
    }
}
