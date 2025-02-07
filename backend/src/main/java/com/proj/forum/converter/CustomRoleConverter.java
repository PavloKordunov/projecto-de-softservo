package com.proj.forum.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        List<String> roles = jwt.getClaimAsStringList("groups");

        return roles == null ? List.of() :
                roles.stream()
                        .map(role -> (GrantedAuthority) () -> "ROLE_" + role)
                        .collect(Collectors.toList());
    }
}

