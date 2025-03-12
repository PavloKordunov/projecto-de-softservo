package com.proj.forum.service.impl;

import com.proj.forum.dto.TagDto;
import com.proj.forum.entity.Tag;
import com.proj.forum.repository.TagRepository;
import com.proj.forum.service.TagService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public UUID createTag(TagDto tagDto) {
        Tag tag = mapToTag(tagDto);
        Tag tagFromDB = tagRepository.save(tag);
        return tagFromDB.getId();
    }

    @Override
    public TagDto getTag(UUID id) {
        Optional<Tag> tagEntity = tagRepository.findById(id);
        if (tagEntity.isEmpty()) {
            throw new EntityNotFoundException("Tag not found");
        }
        Tag tag = tagEntity.get();
        return getUpdateTag(tag);
    }

    @Override
    public List<TagDto> getAllTags() {
        List<Tag> tagList = tagRepository.findAll();
        if (tagList.isEmpty()) {
            throw new EntityNotFoundException("Tag not found");
        }
        return tagList.stream()
                .map(TagServiceImpl::getUpdateTag)
                .toList();
    }

    private static Tag mapToTag(TagDto tagDto) {
        return Tag.builder()
                .name(tagDto.name())
                .build();
    }

    private static TagDto getUpdateTag(Tag tag) {
        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }

}
