package com.proj.forum.strategy;

public interface CustomMapper<S,T> {
    T mapToDto (S source);
    S mapToEntity (T source);
}
